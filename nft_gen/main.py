from PIL import Image
import os

def generate():
	for i3 in os.listdir('backgrounds'):
		for i in os.listdir('resized-bases'):
			for i2 in os.listdir('hats'):
				color = Image.open(f"backgrounds/{i3}")
				background = Image.open(f"resized-bases/{i}")
				foreground = Image.open(f"hats/{i2}")

				color.paste(background, (0,0), background)
				color.paste(foreground, (0,0), foreground)
				i4 = i.replace(".png", "")
				i5 = i3.replace(".png", "")
				color.save(f"final_imgs/{i5}-{i4}-{i2}")

generate()
print(len(os.listdir('final_imgs')))
