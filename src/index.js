/* eslint-disable no-console */
const CONTRIBUTOR_TITLE = 'Contributors'

class QThanks {
  constructor () {
    this.title = null

    this.contributorTitle = CONTRIBUTOR_TITLE
    this.contributors = []

    this.libraries = []
    this.iconsCredits = []

    this.logSvg()
  }

  logSvg () {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98 98" fill="#FFF">
        <path d="M81.7 98H21.8A21.851 21.851 0 010 76.2V10.9A10.926 10.926 0 0110.9 0h54.4a10.926 10.926 0 0110.9 10.9h10.899a10.926 10.926 0 0110.9 10.9v59.9A16.303 16.303 0 0181.7 98M65.3 81.7V10.9H10.9v65.3a10.925 10.925 0 0010.9 10.899h44.5a14.334 14.334 0 01-1-5.4M27.2 65.3H49a5.4 5.4 0 110 10.8H27.2a5.377 5.377 0 01-5.4-5.4 5.442 5.442 0 015.4-5.4m0-21.7H49a5.4 5.4 0 110 10.8H27.2a5.4 5.4 0 110-10.8m0-21.8H49a5.4 5.4 0 010 10.8H27.2a5.4 5.4 0 010-10.8m49 59.9a5.4 5.4 0 0010.8 0V21.8H76.2z"/>
      </svg>
    `

    const svgDataUrl = `data:image/svg+xml;base64,${btoa(svg)}`

    console.log(
      '%c ',
      `
        vertical-align: top;
        padding: 5px;
        margin-right: 10px;
        background-image: url(${svgDataUrl});
        background-size: contain;
        background-position: center center;
        background-repeat: no-repeat;
      `, 'Quentin Neyraud'
    )
  }

  setTitle (title) {
    this.title = title

    return this
  }

  addContributors (contributors = []) {
    contributors.forEach(this.addContributor.bind(this))

    return this
  }

  addContributor (contributor) {
    this.contributors.push(contributor)

    return this
  }

  setContributorTitle (contributorTitle) {
    this.contributorTitle = contributorTitle
  }

  addIconCredits (iconCredits = []) {
    iconCredits.forEach(this.addIconCredit)

    return this
  }

  addIconCredit (iconCredit) {
    this.iconCredits.push(iconCredit)

    return this
  }

  addLibraries (libraries = []) {
    libraries.forEach(this.addLibrary)

    return this
  }

  addLibrary (library) {
    this.libraries.push(library)

    return this
  }

  logTitle () {
    if (!this.title) return

    console.log(this.title)
  }

  clapContributors (contributorLog) {
    if (this.contributors.length === 0) return

    console.group(`👩‍💻👨‍💻 === ${this.contributorTitle} ===`)

    this.contributors.forEach((contributor) => {
      let groupTitle = contributor.name

      if (contributor.status) {
        groupTitle += ` (${contributor.status})`
      }

      console.groupCollapsed(groupTitle)

      if (contributorLog) {
        contributorLog(contributor)
      } else {
        if (contributor.email) {
          console.log('Email', contributor.email)
        }

        if (contributor.status) {
          console.log('Status', contributor.status)
        }

        if (contributor.github) {
          console.log('Github', contributor.github)
        }
      }

      console.groupEnd()
    })

    console.groupEnd()
  }

  clap ({ contributorLog } = {}) {
    this.logTitle()

    this.clapContributors(contributorLog)
  }
}

export default new QThanks()
