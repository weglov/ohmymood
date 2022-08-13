import {
  BarChart,
  Carousel,
  Group,
  LineChart,
  PieChart,
  Subheader,
  Tile,
} from '@revolut/ui-kit'

export const Analytics = () => (
  <Group>
    <Subheader>
      <Subheader.Title>Analytics</Subheader.Title>
    </Subheader>
    <Carousel align="side" aria-label="Analytics charts">
      <Carousel.Item width={1 / 3} minWidth={148}>
        <Tile variant="widget">
          <Tile.Title>
            <Tile.Description variant="small" color="grey-tone-50">
              Yesterday
            </Tile.Description>
          </Tile.Title>
          <Tile.Content mt="s-32">
            <BarChart
              role="img"
              variant="small"
              data={[
                { value: 26, label: '' },
                { value: 32, label: '' },
                { value: 52, label: '' },
                { value: 26, label: '' },
                { value: 21, label: '' },
                { value: 0, label: '' },
                { value: 0, label: '' },
              ]}
              aria-label="Spend this week chart"
            />
          </Tile.Content>
        </Tile>
      </Carousel.Item>
      <Carousel.Item width={1 / 3} minWidth={148}>
        <Tile variant="widget">
          <Tile.Title>
            <Tile.Description variant="small" color="grey-tone-50">
              Your insights
            </Tile.Description>
          </Tile.Title>
          <Tile.Content mt="s-32">
            <LineChart
              role="img"
              variant="small"
              data={[
                { value: 0 },
                { value: 240 },
                { value: 280 },
                { value: 350 },
                { value: 460 },
              ]}
              projectedData={[{ value: 700 }, { value: 790 }]}
              aria-label="Spend this week chart"
            />
          </Tile.Content>
        </Tile>
      </Carousel.Item>
      <Carousel.Item width={1 / 3} minWidth={148}>
        <Tile variant="widget">
          <Tile.Title>
            <Tile.Description variant="small" color="grey-tone-50">
              Top moods
            </Tile.Description>
          </Tile.Title>
          <Tile.Content mt="s-32">
            <PieChart
              role="img"
              variant="small"
              data={[
                {
                  value: 40,
                  color: 'orange',
                },
                {
                  value: 60,
                  color: 'grey-tone-10',
                },
              ]}
              aria-label="Pie chart small"
            />
          </Tile.Content>
        </Tile>
      </Carousel.Item>
    </Carousel>
  </Group>
)
