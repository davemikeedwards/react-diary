import React from 'react'
import '../css/HeaderRow.css'
import { Grid, Header } from 'semantic-ui-react'

const HeaderRow = () => (
  <Grid className='headerGrid'>
    <Grid.Row verticalAlign='middle' className='headerRow'>
      <Grid.Column>
        <Header as='h2' content='React Diary' className='headerTitle' />
        <Header as='h4' content='by Dave Edwards' className='headerSubTitle' />
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

export default HeaderRow