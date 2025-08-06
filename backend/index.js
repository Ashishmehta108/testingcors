import dotenv from "dotenv";
dotenv.configDotenv()
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
const app = express();

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN;
const ACCESS_TOKEN_SECRET = "mysecret1";
const REFRESH_TOKEN_SECRET = "mysecret2";

app.use(cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

// Function to generate JWT tokens
const generateAccessToken = (user) => {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
    return jwt.sign(user, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

app.get("/api/check-auth", (req, res) => {
    console.log(req.cookies)
    const token = req.cookies.access_token;
    if (!token) return res.sendStatus(401);

    try {
        const user = jwt.verify(token, ACCESS_TOKEN_SECRET);
        return res.json({ user, token });
    } catch (err) {
        return res.sendStatus(403);
    }
});


app.post("/api/login", (req, res) => {
    const user = { id: req.body.id, username: req.body.username };

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('access_token', accessToken,
        {
            httpOnly: true, secure: true
        }
    );
    res.cookie('refresh_token', refreshToken,
        {
            httpOnly: true, secure: true
        }
    );

    res.json({ message: "Tokens set in cookies" });
});

// ✅ Start server
app.listen(5000, () => {
    console.log("✅ Server listening on http://localhost:5000");
});

