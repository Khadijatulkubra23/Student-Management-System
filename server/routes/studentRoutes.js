const express = require("express");

const {
  addStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
  getStudentStats,
} = require("../controllers/studentController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();
router.get("/", protect, getStudents);
router.get("/stats", protect, getStudentStats);
router.get("/:id", protect, getStudent);
router.post("/", protect, authorizeRoles("admin"), addStudent);
router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateStudent
);
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteStudent
);

module.exports = router;