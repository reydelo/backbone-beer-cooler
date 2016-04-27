window.Cooler = {  // top level namespace is declared on the window
  Models: {},
  Collections: {},
  Views: {}
};

// Beer Model
Cooler.Models.Beer = Backbone.Model.extend({
  defaults: {
    id: 1,
    name: 'PBR',
    likes: 0
  },
  validate: function(attrs, options){
    if (!attrs.name){
      alert('Your beer must have a name!');
    }
    if (attrs.name.length < 2){
      alert('Your beer\'s name must have more than one letter!');
    }
  },
  liked: function(){
    alert('You\'ve liked ' + this.get('name'));
  }
});

// Beer View
Cooler.Views.Beer = Backbone.View.extend({
  tagName: 'li', // defaults to div if not specified
  className: 'beer', // optional, can also set multiple like 'beer sour'
  events: {
    'click .edit':   'editBeer',
    'click .delete': 'deleteBeer',
    'click .like': 'likeBeer'
  },
  editBeer: function(){
    var newName = prompt("New beer name:", this.model.get('name')); // prompts for new name
    if (!newName)return;  // no change if user hits cancel
    this.model.set('name', newName); // sets new name to model
  },
  likeBeer: function(){
    var likes = this.model.get('likes');
    this.model.set('likes', likes++); // sets new name to model
  },
  deleteBeer: function(){
    this.model.destroy();
  },
  newTemplate: _.template($('#beerTemplate').html()),
  initialize: function() {
    this.on('change', function(){
      console.log('Something has changed');
    });
    this.render(); // render is an optional function that defines the logic for rendering a template
  },
  render: function() {
    this.$el.html(this.newTemplate(this.model.toJSON()));
  }
});

Cooler.Collections.Beer = Backbone.Collection.extend({
  model: Cooler.Models.Beer,
  url: 'http://beer.fluentcloud.com/v1/beer'
});

// View for all beers (collection)
Cooler.Views.Beers = Backbone.View.extend({

  initialize: function() {
    _.bindAll(this, 'render');
    // create a collection
    this.collection = new Cooler.Collections.Beer;
    // Fetch the collection and call render() method
    var that = this;
    this.collection.fetch({
      success: function () {
        console.log(that);
        that.render();
      },
      error: function(collection, xhr, options) {
        console.log(collection, xhr, options);
      }
    });
  },

  render: function(){
    console.log(this.collection.toJSON());
    this.collection.each(function(Beer){
      beerView = new Cooler.Views.Beer({model: Beer});
      $(document.body).append(beerView.el);
    });
  },

  tagName: 'ul',
});

// creates view for collection and renders collection
var beersView = new Cooler.Views.Beers({el: $('body')});
beersView.render();
