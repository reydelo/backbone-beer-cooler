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
Cooler.Views.BeerView = Backbone.View.extend({
  tagName: 'li', // defaults to div if not specified
  className: 'beer', // optional, can also set multiple like 'beer sour'
  events: {
    'click':         'alertTest',
    'click .edit':   'editBeer',
    'click .delete': 'deleteBeer',
    'click .like': 'likeBeer'
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

Cooler.Collections.BeerCollection = Backbone.Collection.extend({
  model: Cooler.Models.Beer
});

// adding individual models to collection
var sour = new Cooler.Models.Beer();


// adding multiple models to collection (this will override the above Tutorial.Collections.Animal)
var beerCollection = new Cooler.Collections.BeerCollection([
  {name: 'Apricot Vielle', likes: 975},
  {name: 'Collete IPA', likes: 342},
  {name: 'Funkwerks Raspberry IPA', likes: 834}
]);

// View for all beers (collection)
Cooler.Views.BeersView = Backbone.View.extend({ // calling this BeersView to distinguish as the view for the collection
  tagName: 'ul',
  initialize: function(){
    this.collection;
  },
  render: function(){
    this.collection.each(function(Beer){
      beerView = new Cooler.Views.BeerView({model: Beer});
      $(document.body).append(beerView.el);
    });
  }
});

// creates view for collection and renders collection
var beersView = new Cooler.Views.BeersView({collection: beerCollection});
beersView.render();
