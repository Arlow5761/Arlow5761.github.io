function DisplayBadges(elementId, badges)
{
    let outHTML = ""
    for (i in badges)
    {
        outHTML += `<div class="badge">
                    <img src="${badges[i].logo}" alt="${badges[i].name} Logo">
                    <div class="text">${badges[i].name}</div>
                </div>`
    }

    document.getElementById(elementId).innerHTML = outHTML
}

function DisplayProjects(elementId, projects)
{
    let outHTML = ""
    for (i in projects)
    {
        outHTML += `<a href="${projects[i].link}">
                    <div class="project">
                        <img class="thumbnail" src="${projects[i].thumbnail}" alt="thumbnail of ${projects[i].name}">
                        <div class="text">${projects[i].name}</div>
                    </div>
                </a>`
    }

    document.getElementById(elementId).innerHTML = outHTML
}

async function GetDataFile(fileDir)
{
    let response = await fetch(fileDir)
    let object = await response.json()

    return object
}

function OpenMainThumbnail()
{
    if (mainProjects == null) return

    let link = mainProjects[mainThumbnailIndex].link
    window.open(link)
}

function UpdateMainThumbnail()
{
    if (mainProjects == null) return

    let name = mainProjects[mainThumbnailIndex].name
    let thumbnail = mainProjects[mainThumbnailIndex].thumbnail

    document.getElementById("mainthumbnail").innerHTML = `<img src="${thumbnail}" alt="thumbnail of ${name}">
                    <div class="text">${name}</div>`

    document.getElementById("headerbg").src = thumbnail
}

function MoveMainThumbnailIndex(offset)
{
    if (mainProjects == null) return

    mainThumbnailIndex = (mainThumbnailIndex + offset) % mainProjects.length
    if (mainThumbnailIndex < 0)
    {
        mainThumbnailIndex += mainProjects.length
    }

    UpdateMainThumbnail()

    clearInterval(mainThumbnailScroller)
    mainThumbnailScroller = setInterval(MoveMainThumbnailIndex, 4000, 1)
}

async function Initialize()
{
    var languageBadges = (await GetDataFile("Data/LanguageBadgesData.json")).data
    var toolBadges = (await GetDataFile("Data/ToolBadgesData.json")).data
    var gameProjects = (await GetDataFile("Data/GameProjectsData.json")).data

    mainProjects = gameProjects

    UpdateMainThumbnail()
    mainThumbnailScroller = setInterval(MoveMainThumbnailIndex, 4000, 1)

    DisplayProjects("gamescontainer", gameProjects)
    DisplayBadges("languagescontainer", languageBadges)
    DisplayBadges("toolscontainer", toolBadges)
}

var mainProjects
var mainThumbnailIndex = 0
var mainThumbnailScroller

if (document.readyState !== "loading")
{
    Initialize()
}
else
{
    document.addEventListener("DOMContentLoaded", Initialize)
}
