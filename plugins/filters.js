import Vue from 'vue'

/**
 * Returns a friendly label for rate
 * 1-4 = beginner
 * 5-6 = improving
 * 7-8 = intermediate
 * 9-10 = expert
 */
Vue.filter('rateLabel', rate => {
  switch (rate) {
    case 1:
    case 2:
    case 3:
    case 4:
      return 'rate.beginner'
    case 5:
    case 6:
      return 'rate.improving'
    case 7:
    case 8:
      return 'rate.intermediate'
    case 9:
    case 10:
      return 'rate.expert'
  }
})
