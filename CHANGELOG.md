# Change Log

All notable changes to this project will be documented in this file. (http://keepachangelog.com/)
This project adheres to [Semantic Versioning](http://semver.org/).

## [2.5.1] - 2024-02-15

- Removed temporarily the strip slash function
- Fixed some invalid code

## [2.5.0] - 2024-02-15

- Styled article page
- Added new layouts handlers for the list of items
- Extended and better styled hobbies page
- Improved color palette
- Improved dark mode maintaining consistency with the original colors

## [2.4.0] - 2024-01-19

- Implemented dark mode
- Added missing required favicons per devices
- Added manifest
- Enabled PWA

## [2.3.0] - 2023-12-14

- Enabled the blog section to handle dynamic subpages
- Added page transitions
- Fixed certification card style
- Improved title on SbImage component
- Fixed translations

## [2.2.5] - 2023-12-09

- Restored jobs API call inside the singles pages to fix content get by current locale

## [2.2.4] - 2023-12-06

- Added again canonical links and SEO meta in a better way

## [2.2.3] - 2023-12-04

- Fixed social metadatas that were previously only generated client side

## [2.2.2] - 2023-12-02

- Fixed dates manipulations results in Safari

## [2.2.1] - 2023-11-28

- Fixed forward with overwrite in scss

## [2.2.0] - 2023-11-28

- The language switcher now retrieves the list based on the language set on Storyblok
- Improved microdata
- Improved cookie policy warning
- Refactored scss imports
- Fixed SEO problems

## [2.1.2] - 2023-11-28

- Fixed sitemap

## [2.1.1] - 2023-11-24

- Enabled cookie policy

## [2.1.0] - 2023-11-24

- Redesigned the website entirely
  - Moved from one page website to multiple pages

## [2.0.0] - 2023-11-17

- Upgraded to Nuxt 3

## [1.9.4] - 2023-09-20

- Fixed `TypeError: null is not an object (evaluating 'o.filter')`

## [1.9.3] - 2023-09-18

- Upgraded i18n module to add canonicals to page (and try to fix SEO errors)

## [1.9.2] - 2023-09-18

- Fixed Sentry error for `TypeError f.isHomePage Cannot read properties of null (reading 'substring')`
- Upgraded to Nuxt 2.17

## [1.9.1] - 2023-05-14

- Changed generated folder
- Fixed desktop style
- Refactored dirty code

## [1.9.0] - 2023-05-09

- Removed remaing Foundation styles
- Refactored css
- Cleaned code and folders from no more used files

## [1.8.2] - 2023-03-12

- Fixed Lighthouse Audit errors

## [1.8.1] - 2023-03-12

- Added sitemap nuxt module

## [1.8.0] - 2023-03-12

- Refactored components names into pascal case
- Added and show the certifications expired date
- 🐛 Hotfix: added meta description again

## [1.7.0] - 2022-09-06

- Upgraded Nuxt to 2.15
- Upgraded to Node 16 minimum requirement
- Removed node-sass and add dart-sass
- Fixed lint errors
- Removed prismic link resolver

## [1.6.0] - 2022-03-02

- Replaced Prismic with Storyblok (sorry Prismic 🙏)
- Changed certification component position

## [1.5.0] - 2021-11-29

- Added publications section
- Updated info

## [1.4.1] - 2021-11-14

- Fixed English duration translation and added a setting to show/hide duration

## [1.4.0] - 2021-11-14

- Added Storyblok
- Updated info

## [1.3.3] - 2021-10-19

- Removed outdated cv

## [1.3.2] - 2021-05-01

- Fixed Lighthouse warnings

## [1.3.1] - 2020-11-29

- Edited max number of skills to show

## [1.3.0] - 2020-11-28

- Added browser detection language redirect
- Improved GitLab pipeline

## [1.2.0] - 2020-09-19

- Added publication section
- Upgrade Nuxt.js to v2.14

## [1.1.1] - 2020-07-26

- Fixed unsafe links to cross-origin destinations

## [1.1.0] - 2020-07-26

- Installed Sentry
- Upgraded Nuxt.js to v2.13
- Converted color variables in CSS variables
- Added Ally palette version

## [1.0.6] - 2020-06-02

- Fixed error page

## [1.0.6] - 2020-06-02

- Added missing translation and activated Prismic token

## [1.0.5] - 2020-06-01

- Removed footer border

## [1.0.4] - 2020-06-01

- Fixed meter matching

## [1.0.3] - 2020-06-01

- Fixed header on tablet and update social image

## [1.0.2] - 2020-06-01

- Added sitemap

## [1.0.1] - 2020-06-01

- Added og:image

## [1.0.0] - 2020-06-01

- Rebuilt the project with Nuxt.js and Prismic.io 🎉
