import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { inject: { service }, Route } = Ember;

export default Route.extend(ApplicationRouteMixin, {

  userManager: service(),

  loading: service(),

  session: service('session'),

  beforeModel: function() {
    return this._loadCurrentUser();
  },

  sessionAuthenticated: function() {
    this._super(...arguments);
    this._loadCurrentUser().catch(() => this.get('session').invalidate());
  },

  setupController: function(controller, model) {
    controller.set('session', this.get('session'));
    controller.set('userManager', this.get('userManager'));
    this._super(controller, model);
  },

  _loadCurrentUser: function() {
    return this.get('userManager').load();
  },
});
