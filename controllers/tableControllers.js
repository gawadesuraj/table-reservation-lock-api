const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../table-data.json");
let tableLocks = require("../table-data.json");

const handleLockRequest = (req, res) => {
  const { tableId, userId, duration } = req.body;
  const currentTime = Date.now();
  const expiryTime = currentTime + duration * 1000;

  const table = tableLocks.find((t) => t.tableId === tableId);

  if (table && table.duration > currentTime) {
    return res.status(409).json({
      success: false,
      message: "Table is currently locked by another user.",
    });
  }

  // Remove old entry if it exists
  tableLocks = tableLocks.filter((t) => t.tableId !== tableId);

  tableLocks.push({
    tableId,
    userId,
    duration: expiryTime,
  });

  fs.writeFile(filePath, JSON.stringify(tableLocks, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Failed to lock table." });
    }
    return res.status(200).json({ success: true, message: "Table locked successfully." });
  });
};


const handleUnlockRequest = (req, res) => {
  const { tableId, userId } = req.body;

  const table = tableLocks.find((table) => table.tableId === tableId);

  if (!table) {
    return res.status(404).json({ success: false, message: "Table not found." });
  }

  if (table.userId !== userId) {
    return res.status(403).json({ success: false, message: "Unauthorized unlock attempt." });
  }

  tableLocks = tableLocks.filter((t) => t.tableId !== tableId);

  fs.writeFile(filePath, JSON.stringify(tableLocks, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Failed to unlock table." });
    }
    return res.status(200).json({ success: true, message: "Table unlocked successfully." });
  });
};


const getTableStatus = (req, res) => {
  const tableId = req.params.tableId;
  const table = tableLocks.find((table) => table.tableId === tableId);
  const currentTime = Date.now();

  if (!table || table.duration < currentTime) {
    return res.status(200).json({ isLocked: false });
  }

  return res.status(200).json({ isLocked: true });
};


module.exports = { handleLockRequest, handleUnlockRequest, getTableStatus };
