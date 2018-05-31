import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import FormControl from "@material-ui/core/FormControl"
import FormGroup from "@material-ui/core/FormGroup"
import FormLabel from "@material-ui/core/FormLabel"

const cardStyle = {
  maxWidth: 200,
}

class FilterCard extends React.Component {
  constructor(props) {
    super(props)
    //this.state =
  }

  render() {
    return (
      <Card style={cardStyle}>
        <CardContent>
          <FormControl component="fieldset">
            <FormGroup row component="legend">
              <FormLabel component="legend">{this.props.label}</FormLabel>
              {this.props.children}
            </FormGroup>
          </FormControl>
        </CardContent>
      </Card>
    )
  }
}

export default FilterCard
