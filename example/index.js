import QClap from '../src/index'

QClap
  .addContributor({
    name: 'Quentin Neyraud',
    status: 'Developper',
    github: 'http://www.github.com/quentinneyraud',
    twitter: 'http://www.twitter.com/quentinneyraud',
    site: 'http://www.quentinneyraud.fr'
  })
  .addContributors([{
    name: 'Quentin Neyraud 2',
    status: 'Developper2',
    github: 'http://www.github.com/quentinneyraud2',
    twitter: 'http://www.twitter.com/quentinneyraud2',
    site: 'http://www.quentinneyraud.fr2'
  }])
  .setTitle('Made by Akaru')
  .clap()
