// Beer Model
Cooler.Models.Beer = Backbone.Model.extend({
  defaults: {
    likes: 0
  },
  urlRoot: 'http://beer.fluentcloud.com/v1/beer',
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
