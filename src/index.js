/* eslint-disable no-console */
import svg from './github.svg'

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
