import axios from "axios";


export const mockApi = axios.create({
  baseURL: "https://695bbe411d8041d5eeb8390d.mockapi.io",
  headers: {
    "Content-Type": "application/json",
  },
});


export const sheetApi = axios.create({
  baseURL:
    "https://api.sheety.co/a2b1328993660a67af1a0300ee237042/skillswap",
  headers: {
    "Content-Type": "application/json",
  },
});


export const SHEETY_ENDPOINTS = {
  users: "/users",
  matches: "/matches",
  activities: "/activities",
  mySkills: "/mySkills",
  requests: "/requests",
  messages: "/messages",
  community: "/community",
  skills: "/skills",
};

export const fetchUsers = async () => {
  try {
    const res = await sheetApi.get(SHEETY_ENDPOINTS.users);
    return res.data.users || [];
  } catch (err) {
    console.warn("Sheety failed, using MockAPI (users)");
    const res = await mockApi.get("/users");
    return res.data || [];
  }
};


export const fetchMatches = async () => {
  try {
    const res = await sheetApi.get(SHEETY_ENDPOINTS.matches);
    return res.data.matches || [];
  } catch (err) {
    console.warn("Sheety failed, using MockAPI (matches)");
    const res = await mockApi.get("/matches");
    return res.data || [];
  }
};

export const fetchActivities = async () => {
  try {
    const res = await sheetApi.get(SHEETY_ENDPOINTS.activities);
    return res.data.activities || [];
  } catch (err) {
    console.warn("Sheety failed, using MockAPI (activities)");
    const res = await mockApi.get("/activities");
    return res.data || [];
  }
};




/* GET ALL SKILLS */
export const fetchSkills = async () => {
  try {
    const res = await sheetApi.get(SHEETY_ENDPOINTS.skills);
    return res.data.skills || [];
  } catch (err) {
    console.warn("Sheety failed, using MockAPI (skills)");
    const res = await mockApi.get("/skills");
    return res.data || [];
  }
};

/* GET SINGLE SKILL */
export const fetchSkillById = async (id) => {
  try {
    const res = await sheetApi.get(`${SHEETY_ENDPOINTS.skills}/${id}`);
    return res.data.skill;
  } catch (err) {
    console.warn("Sheety failed, using MockAPI (skill by id)");
    const res = await mockApi.get(`/skills/${id}`);
    return res.data;
  }
};

/* ADD SKILL */
export const addSkill = async (skillData) => {
  try {
    const res = await sheetApi.post(SHEETY_ENDPOINTS.skills, {
      skill: skillData,
    });
    return res.data.skill;
  } catch (err) {
    console.warn("Sheety failed, using MockAPI (add skill)");
    const res = await mockApi.post("/skills", skillData);
    return res.data;
  }
};

/* UPDATE SKILL */
export const updateSkill = async (id, skillData) => {
  try {
    const res = await sheetApi.put(`${SHEETY_ENDPOINTS.skills}/${id}`, {
      skill: skillData,
    });
    return res.data.skill;
  } catch (err) {
    console.warn("Sheety failed, using MockAPI (update skill)");
    const res = await mockApi.put(`/skills/${id}`, skillData);
    return res.data;
  }
};

/* DELETE SKILL */
export const deleteSkill = async (id) => {
  try {
    await sheetApi.delete(`${SHEETY_ENDPOINTS.skills}/${id}`);
    return true;
  } catch (err) {
    console.warn("Sheety failed, using MockAPI (delete skill)");
    await mockApi.delete(`/skills/${id}`);
    return true;
  }
};

