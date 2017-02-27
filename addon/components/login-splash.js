import Ember from 'ember';
import layout from '../templates/components/login-splash';
const { inject: { service } } = Ember;

export default Ember.Component.extend({
  username: null,
  password: null,
  errorMessage: null,
  session: service('session'),
  loading: service('loading'),

  actions: {
    authenticate: function() {
      let loading = this.get('loading');

      loading.show();
      this.set('errorMessage', null);
      let { username, password } = this.getProperties('username', 'password');
      this.get('session')
        .authenticate('authenticator:modlr', username, password)
        .catch((error) => this.set('errorMessage', error.detail || null))
        .finally(() => loading.hide())
      ;
    }
  },
  layout
});
