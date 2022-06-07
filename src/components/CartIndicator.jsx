import Button from 'react-bootstrap/Button'
import { FaShoppingCart } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'

// we need to write mapStateToProps for EVERY component we want to empower with read access to the redux store
// mapStateToProps is a function: it will return an OBJECT
// it is called mapStateToProps because every PROPERTY in this object
// will become a PROP for CartIndicator
const mapStateToProps = (state) => {
  return {
    cartLength: state.cart.content.length,
  }
}

const CartIndicator = ({ cartLength }) => {
  const navigate = useNavigate()

  return (
    <div className="ml-auto mt-2">
      <Button color="primary" onClick={() => navigate('/cart')}>
        <FaShoppingCart />
        <span className="ml-2">{cartLength}</span>
      </Button>
    </div>
  )
}

export default connect(mapStateToProps)(CartIndicator)
// connect works just like withRouter
// withRouter was creating a HOC -> higher order component

// connect takes up to two arguments: mapStateToProps and mapDispatchToProps
// mapStateToProps defines what we're going to READ from the redux store (read access)
// mapDispatchToProps defines in which ways we're going to affect the redux store (write access)
