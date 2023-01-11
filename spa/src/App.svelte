<script lang="ts">
  import { Router, Route } from 'svelte-routing'
  import Home from './routes/Home.svelte'
  import Brands from './routes/brands/index.svelte'
  import Detailbrand from './routes/brands/Detail.svelte'
  import Watches from './routes/watches/index.svelte'
  import Detailwatch from './routes/watches/Detail.svelte'
  import Matcher from './routes/Matcher.svelte'
</script>

<Router>
  <Route path="/" component={Home} />
  <Route path="brands" component={Brands} />
  <Route path="brands/:name" component={Detailbrand} />
  <Route path="watches" component={Watches} />
  <Route path="watches/:name" component={Detailwatch} />
  <Route path="matcher" component={Matcher} />
</Router>
