import Ember from 'ember';
import layout from '../templates/components/user-nav';
const { inject: { service } } = Ember;

export default Ember.Component.extend({
  loading: service(),
  session: service('session'),
  userManager: service(),
  actions: {
    logout: function() {
      const loading = this.get('loading');
      loading.show();
      this.get('session').invalidate().finally(() => loading.hide());
    },
  },
  layout
});
