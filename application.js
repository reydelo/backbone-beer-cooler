var Beer = Backbone.Model.extend({
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



var BeerView = Backbone.View.extend({
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
