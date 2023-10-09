router.post('/logout', async (req, res) => {
  try {
    // Clear user session data
    req.session.destroy(() => {
      res.status(204).end(); // Respond with a success status
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Logout failed' });
  }
});