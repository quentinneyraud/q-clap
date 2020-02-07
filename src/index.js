/* eslint-disable no-console */
const icons = {
  github: require('./github.svg')
}

const CONTRIBUTOR_TITLE = 'Contributors'

class QThanks {
  constructor () {
    this.title = null

    this.contributorTitle = CONTRIBUTOR_TITLE
    this.contributors = []

    this.libraries = []
    this.iconsCredits = []

    console.log(this._getStyleString({
      verticalAlign: 'top'
    }))
  }

  log ({ text, style, icon = null }) {
    // const iconData = this._getIcon(icon)
  }

  _getIcon (icon) {
    return icons[icon] || icon
  }

  _getStyleString (styles) {
    return Object.entries(styles)
      .reduce((acc, [styleRule, styleValue]) => {
        styleRule = styleRule.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)
        acc += `${styleRule}=${styleValue};`

        return acc
      }, '')
  }

  logSvg () {
    const svgDataUrl = `data:image/svg+xml;base64,${btoa(githubIcon)}`

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

    console.log(`%c${this.title}`,
      `
        padding: 25px 0;
      `
    )
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
