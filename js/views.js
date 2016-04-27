// Beer View
Cooler.Views.Beer = Backbone.View.extend({
  tagName: 'li', // defaults to div if not specified
  className: 'beer', // optional, can also set multiple like 'beer sour'
  events: {
    'click .edit': 'editBeer',
    'click .delete': 'deleteBeer',
    'click .like': 'likeBeer'
  },
  editBeer: function(){
    var newName = prompt("New beer name:", this.model.get('name')); // prompts for new name
    if (!newName)return;  // no change if user hits cancel
    this.model.save('name', newName, {
      error: function(model, response, options){
        console.log('ERROR', model, response, options);
      },
      success: function(model, response, options){
        console.log('SUCCESS', model, response, options);
      }
    });
    this.render();
    console.log(this);
    console.log(this.model);
    console.log(this.model.collection);
  },
  likeBeer: function(){
    var likes = this.model.get('likes');
    likes++;
    this.model.save('likes', likes, {
      success: function(model, response, options) {
        console.log('SUCCESS', model, response, options);
      },
      error: function(model, response, options){
        console.log('ERROR', model, response, options);
      }
    });
    this.render();
  },
  deleteBeer: function(){
    this.remove();
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
        that.render();
      },
      error: function(collection, xhr, options) {
        console.log(collection, xhr, options);
      }
    });
  },
  render: function(){
    console.log(this.collection);
    /* FIXME: this is rendering two buttons... ? */
    $(document.body).append('<button class="add">Add a Beer</button>');
    this.collection.each(function(Beer){
      beerView = new Cooler.Views.Beer({model: Beer});
      $(document.body).append(beerView.el);
    });
  },
  className: 'beerIndex',
  events: {
    'click .add': 'addBeer'
  },
  addBeer: function() {
    var newName = prompt('New beer name:');
    if (!newName)return;  // no change if user hits cancel
    console.log(this.collection);
    this.collection.add({name: newName});
    this.render();
    console.log(this.collection);
  },
  tagName: 'ul'
});

// creates view for collection and renders collection
var beersView = new Cooler.Views.Beers({el: $('body')});
beersView.render();
