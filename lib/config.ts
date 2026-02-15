// ============================================
// PERSONALIZE: Add your GitHub username here
// ============================================
// Example: If your GitHub URL is https://github.com/yourusername
// Then set: export const GITHUB_USERNAME = "yourusername";
export const GITHUB_USERNAME = "HarshYadav1711"; // TODO: Replace with your actual GitHub username

// ============================================
// PRIORITIZED PROJECTS: Projects to always show first
// ============================================
// Add repository names (exact match or partial match) that should be prioritized
// These projects will appear first in your portfolio
export const PRIORITIZED_PROJECTS: string[] = [
  // QPS project
  "qps",
  // Dashboard & learning projects (matched by repo name keywords)
  "mentor-session-booking",   // Mentor Session Booking Dashboard
  "student-learning-progress", // Student Learning Progress & Engagement Dashboard
  "session-discovery",        // Session Discovery — Intelligent Search & Recommendation Interface
  // AI Agent projects (case-insensitive matching)
];

// ============================================
// EXCLUDED PROJECTS: Projects to hide from portfolio
// ============================================
// Add repository names that should be excluded from the portfolio
export const EXCLUDED_PROJECTS: string[] = [
  "clinic-tracker",
  "clinic",
];

// ============================================
// PROJECT DISPLAY NAMES: Custom titles for specific repos
// ============================================
// Map repo name keyword (lowercase) to the exact title to show in portfolio
export const PROJECT_DISPLAY_NAMES: { [key: string]: string } = {
  "mentor-session-booking": "Mentor Session Booking Dashboard",
  "student-learning-progress": "Student Learning Progress & Engagement Dashboard",
  "session-discovery": "Session Discovery — Intelligent Search & Recommendation Interface",
};

// Order for featured projects (first in list = show first)
export const FEATURED_PROJECT_ORDER: string[] = [
  "mentor-session-booking",
  "student-learning-progress",
  "session-discovery",
  "qps",
];

