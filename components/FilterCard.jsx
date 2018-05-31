import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"

const cardStyle = {
  maxWidth: 200
}

class FilterCard extends React.Component {
  constructor(props) {
    super(props)
    //this.state =
  }

  render() {
    return (
      <Card style={cardStyle}>
        <CardContent>abc</CardContent>
      </Card>
    )
  }
}

export default FilterCard
