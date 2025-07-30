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

export { create };
