
var AddProduct = react.createClass({
  productHandler: function() {
    this.props.whenAdded({
    this.refs.name.value,
    this.refs.price.value
    }
  },
  render: function() {
    return (
      <div>
        <input type='text' name="name" ref="name" />
        <input type='text' name="price" ref="price" />
        <input type="submit" onChange={this.productHandler} />
      </div>
    )
  }
})


var SearchBar = React.createClass({
  handleChange: function(){
    this.props.onUserInput(
      this.refs.filterText.value,
      this.refs.inStockOnly.checked
    );
  },
  render: function() {
    return (
      <div>
        <input type='text' placeholder="Search..." value={this.props.filterText}  ref="filterText"
          onChange={this.handleChange}/>
        <br />
        <input type='checkbox' name="check" checked={this.props.inStockOnly} ref="inStockOnly"
            onChange={this.handleChange}/>
        <label for="check"> Only show products in stock </label>

      </div>
    )
  }
})

var ProductTable = React.createClass({
  render: function() {
    var sportRows = this.props.sports.map((function(item){
      if(item.name.indexOf(this.props.filterText) === -1 || (!item.stocked && this.props.inStockOnly)) return;
      return <ProductRow stocked={item.stocked} item={item.name} price={item.price} />
    }).bind(this))
    var electronicRows = this.props.electronics.map((function(item){
      if(item.name.indexOf(this.props.filterText) === -1 || (!item.stocked && this.props.inStockOnly)) return;
      return <ProductRow stocked={item.stocked} item={item.name} price={item.price} />
    }).bind(this))
    return (
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
        </thead>
        <tbody>
        <ProductCategoryRow category="Sporting Goods" />
        {sportRows}
        <ProductCategoryRow category="Electronics" />
        {electronicRows}
        </tbody>
      </table>
    )
  }
})

var ProductCategoryRow = React.createClass({
  render: function() {
    return (
    <tr>
    <th> {this.props.category} </th>
    </tr>
  )
  }
})

var ProductRow = React.createClass({
  render: function() {
    var name = this.props.stocked ?
      this.props.item :
      <span style={{color: 'red'}}>
        {this.props.item}
      </span>
    return (
      <tr>
      <td>{name}</td>
      <td>{this.props.price} </td>
      </tr>
    )
  }
})

var FilterableProductTable = React.createClass({
  getInitialState: function(){
    return ({
      filterText: '',
    inStockOnly: false,
    sports: this.props.electronics,
    electronics: this.props.sports,
    })
  },
  addItem: function(name, price) {
    this.setState({
        sports: this.state.sports.push({name: name, price: price})
    })
  },
  handleUserInput: function(filter, inStock){
    this.setState({
      filterText: filter,
      inStockOnly: inStock
    });
  },
  render: function() {
    return (
      <div>
      <SearchBar filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} onUserInput={this.handleUserInput} />
      <AddProduct whenAdded={this.addItem} />
      <ProductTable electronics={this.state.electronics} sports={this.state.sports} filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly} />
      </div>
    )
  }
})


var sportProducts = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'}
]

var electronicProducts = [ {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
{category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
{category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(<FilterableProductTable electronics={electronicProducts} sports={sportProducts} />, document.getElementById('content'))
