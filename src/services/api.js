import axios from "axios";
export const mockApi = axios.create({
  baseURL: "https://695bbe411d8041d5eeb8390d.mockapi.io",
  headers: {
    "Content-Type": "application/json",
  },
});

export const sheetApi = axios.create({
  baseURL: "https://api.sheety.co/09934dbeb4cdbd806015e7f281dc4805/skillswap/",
  headers: {
    Authorization: "Bearer YOUR_SHEETY_TOKEN", 
    "Content-Type": "application/json",
  },
});

export const SHEETY_ENDPOINTS = {
  users: "/users",
  matches: "/matches",
  activities: "/activities",
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

export const fetchUserById = async (id) => {
  try {
    const res = await sheetApi.get(`${SHEETY_ENDPOINTS.users}/${id}`);
    return res.data.user;
  } catch (err) {
    console.warn("Sheety failed, using MockAPI (user by id)");
    const res = await mockApi.get(`/users/${id}`);
    return res.data;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const res = await sheetApi.put(`${SHEETY_ENDPOINTS.users}/${id}`, {
      user: userData,
    });
    return res.data.user;
  } catch (err) {
    console.warn("Sheety failed, using MockAPI (update user)");
    const res = await mockApi.put(`/users/${id}`, userData);
    return res.data;
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


