import { Layout } from "../../components/Layout"
import { DragonList } from "../../components/DragonList"


export const Dragons = () => {

  return (<Layout
    breadcrumbs={[
      { name: 'Home' },
    ]}
  >
    <DragonList />
  </Layout>)
}