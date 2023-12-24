import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
    let accessToken = req.headers.authorization
    // console.log(accessToken)
    if (!accessToken) return res.status(401).json({
        err: 1,
        msg: 'Missing access token'
    })

    jwt.verify(accessToken.split(' ')[1], process.env.SECRET_KEY, (err, user) => {
        if (err) return res.status(401).json({
            err: 1,
            msg: 'Access token expired'
        })

        req.user = user
        next()
    })
}

export const verifyTokenSocket = (token) => {
    let accessToken = token
    console.log("access token", accessToken)
    let data= {}
    // console.log(accessToken)
    jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
        data= user
    })
    return data
}

export const isAdmin = (req, res, next) => {
    const { roleCode } = req.user
    if (roleCode !== 'R1') return res.status(401).json({
        err: 1,
        msg: 'Require admin role'
    })
    next()
}

export default verifyToken