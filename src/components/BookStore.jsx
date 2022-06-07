import { Component } from 'react'
import BookList from './BookList'
import BookDetail from './BookDetail'
import { Alert, Col, Row, Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'
import { getBooksAction } from '../redux/actions'

const mapStateToProps = (state) => {
  return {
    booksFromReduxStore: state.book.stock, // <-- the array of books from the redux store
    errorFetchingBooks: state.book.error,
    areBooksLoading: state.book.loading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBooks: () => {
      dispatch(getBooksAction())
    },
  }
}

class BookStore extends Component {
  state = {
    // books: [], // <-- this was a local state holding the books, I don't need it anymore...
    bookSelected: null,
  }

  componentDidMount = async () => {
    // previously here I was doing the fetch and saving the books locally...
    // ...now I'll dispatch the action creator here! getBooks
    this.props.getBooks()
  }

  changeBook = (book) => this.setState({ bookSelected: book })

  render() {
    return (
      <Row>
        <Col md={4}>
          {this.props.areBooksLoading && (
            <Spinner variant="success" animation="border" />
          )}
          {this.props.errorFetchingBooks ? (
            <Alert variant="danger">An error happened :(</Alert>
          ) : (
            <BookList
              bookSelected={this.state.bookSelected}
              changeBook={this.changeBook}
              books={this.props.booksFromReduxStore}
            />
          )}
        </Col>
        <Col md={8}>
          <BookDetail bookSelected={this.state.bookSelected} />
        </Col>
      </Row>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookStore)
