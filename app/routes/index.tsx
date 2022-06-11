import type { LoaderFunction } from "@remix-run/node"
import { deferred } from "@remix-run/node"
import { Deferred, Link, useDeferred, useLoaderData } from "@remix-run/react"

export const loader: LoaderFunction = () =>
  deferred({
    data: Promise.resolve([...Array(1_000_000)].map(() => "hey there")),
  })

export default function Index() {
  const { data } = useLoaderData()
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <Link to="/another">another page</Link>
      <Deferred data={data} fallback={<p>Loading...</p>}>
        <View />
      </Deferred>
    </div>
  )
}

function View() {
  const data = useDeferred<unknown[]>()
  return <p>{data.length}</p>
}
