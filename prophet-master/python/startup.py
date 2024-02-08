import pandas as pd
from fbprophet import Prophet

df = pd.read_csv("../examples/example_wp_log_peyton_manning.csv")
df.head()

m=Prophet()
m.fit(df)

# future = m.make_future_dataframe(periods=365)
# future.tail()

