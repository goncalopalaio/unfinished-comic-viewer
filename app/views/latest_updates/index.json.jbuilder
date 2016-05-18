json.array!(@latest) do |series|
  json.extract! series, :id, :title
  json.cover_image_large series.cover_image.url(:large)
  json.tags do
    json.array! series.tags, :name
  end
  json.date(series.latest_update.to_s(:short))


end
