
async function DisplayProjects(elementId, projectsFileDir)
{
    let response = await fetch(projectsFileDir)
    let projectsFileObject = await response.json()
    let projects = await projectsFileObject.data

    let outHTML = ""
    for (i in projects)
    {
        outHTML += `<li><a href="${projects[i].link}">${projects[i].name}</a></li>`
    }

    document.getElementById(elementId).innerHTML = outHTML
}

document.addEventListener("DOMContentLoaded", function()
{
    DisplayProjects("GamesList", "GameProjectsData.json")
})
