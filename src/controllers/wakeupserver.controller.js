export const wakeUpServer = (req, res) => {
    res.status(200).json({ message: 'pong' });
};