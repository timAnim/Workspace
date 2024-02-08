import qencode3

client = qencode.client(API_KEY)
client.create()

task = client.create_task()
task.start()

metadata = client.get_metadata(VIDEO_URL)