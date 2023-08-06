
export default function handler(req, res) {
    // webhook: https://events.hookdeck.com/e/src_lWIMXhmodOTt
    res.status(200).json({ name: 'John Doe' })
  }
  