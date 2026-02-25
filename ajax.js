const form = document.getElementById("skillForm");
const skillsList = document.getElementById("skillsList");

async function fetchSkills() {
  const res = await fetch("/api/skills");
  const skills = await res.json();

  skillsList.innerHTML = "";

  skills.forEach(skill => {
    const div = document.createElement("div");
    div.className = "skill";
    div.innerHTML = `
      <strong>${skill.name}</strong> (${skill.category})
      <p>${skill.description}</p>
      <button onclick="updateSkill('${skill._id}')">PUT Update</button>
      <button onclick="patchSkill('${skill._id}')">PATCH Update</button>
      <button onclick="deleteSkill('${skill._id}')">Delete</button>
    `;
    skillsList.appendChild(div);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const skill = {
    name: document.getElementById("name").value,
    category: document.getElementById("category").value,
    description: document.getElementById("description").value,
  };

  await fetch("/api/skills", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(skill),
  });

  form.reset();
  fetchSkills();
});


async function updateSkill(id) {
  await fetch(`/api/skills/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Updated Skill",
      category: "Updated Category",
      description: "Fully updated using PUT",
    }),
  });

  fetchSkills();
}


async function patchSkill(id) {
  await fetch(`/api/skills/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      description: "Partially updated using PATCH",
    }),
  });

  fetchSkills();
}

async function deleteSkill(id) {
  await fetch(`/api/skills/${id}`, {
    method: "DELETE",
  });

  fetchSkills();
}

fetchSkills();
