const express = require("express");
const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const { JWT_SECRET } = process.env;
const authMiddleware = require("../middleware");

const signupBody = zod.object({
    username: zod.string().email(),
    firstname: zod.string(),
    lastname: zod.string(),
    password: zod.string()
})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})


router.get("/getMyinfo", authMiddleware, async (req, res) => {

    const userId = req.userId;
    try {
        const existingUser = await Account.findOne({
            userId
        })

        res.json({
            existingUser
        })
    } catch (error) {
        res.json({
            message: "User not found"
        })
    }

})


router.post("/signup", async (req, res) => {
    const body = req.body;

    try {
        const { success } = signupBody.safeParse(body);
        if (!success) {
            return res.status(411).json({
                message: "Incorrect inputs"
            })
        }

        const existingUser = await User.findOne({
            username: body.username
        })

        if (existingUser) {
            return res.status(411).json({
                message: "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(body.password, 10);

        const newUser = await User.create({
            username: body.username,
            password: hashedPassword,
            firstName: body.firstname,
            lastName: body.lastname
        });
        const userId = newUser._id;
        await Account.create({
            userId,
            balance: Math.floor(1 + Math.random() * 10000)
        })

        const token = jwt.sign({
            userId
        }, JWT_SECRET)

        res.json({
            message: "User created successfully", token
        })

    } catch (error) {
        return res.status(405).json({
            message: "Something went wrong"
        })
    }
})

router.get("/me", authMiddleware, (req, res) => {
    res.json({
        message: "previously logged user found"
    })
})


router.post("/signin", async (req, res) => {
    const body = req.body;
    try {
        const { success } = signinBody.safeParse(body);

        if (!success) {
            return res.status(411).json({
                message: "Incorrect Inputs"
            })
        }
        const existingUser = await User.findOne({
            username: body.username
        })

        if (!existingUser._id) {
            return res.status(411).json({
                message: "User not found"
            })
        }
        const checkPassword = await bcrypt.compare(body.password, existingUser.password);

        if (!checkPassword) {
            return res.status(411).json({
                Message: "Incorrect Password"
            })
        }

        const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET)

        res.status(200).json({
            message: "User logged in", token
        })

    } catch (error) {
        res.status(405).json({
            message: "Something went wrong"
        })
    }
})

router.put("/", authMiddleware, async (req, res) => {
    const body = req.body;
    try {
        const { success } = updateBody.safeParse(body);
        if (!success) {
            return res.status(411).json({
                message: "Error while updating information"
            })
        }

        await User.updateOne({ _id: req.userId }, body);
        res.json({
            message: "Update successfull"
        })
    } catch (error) {
        return res.status(411).json({
            message: "Error while updating information"
        })
    }
})



router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";
    try {
        const users = await User.find({
            $or: [{
                firstName: {
                    "$regex": filter
                }
            }, {
                lastName: {
                    "$regex": filter
                }
            }]
        })

        res.json({
            user: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        })
    } catch (error) {
        return res.status(405).json({
            message: "Something went wrong"
        })
    }

})





module.exports = router;

