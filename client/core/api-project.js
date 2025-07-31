const create = async (project, credentials) => {
  try {
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.t}`,
      },
      body: JSON.stringify(project),
    });
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};

const getProjects = async (credentials, signal) => {
  try {
    const res = await fetch("/api/projects", {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${credentials.t}`,
      },
    });
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};

const remove = async (projectId, credentials) => {
  try {
    const res = await fetch(`/api/projects/${projectId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.t}`,
      },
    });
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};

export { create, getProjects, remove };
