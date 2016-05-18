json.extract! @series , :title,:tags
json.cover_image_large @series.cover_image.url(:large)
