module EdenHelper
    def fetch_eden_data
      data = HTTParty.get("https://www.mangaeden.com/api/list/0/",{format: :json})
      series_list = data["manga"]
      puts "Number of series", series_list.count
      series_list.each_with_index do |series,index|
        puts "Series n #",index
        latest_update=nil
        if series["ld"].present?
        latest_update=Time.at(series["ld"])
        end

        if not Series.exists?(eden_id: series["i"])
          cover_image=nil
          if series["im"]
            cover_image_path_prefix="https://cdn.mangaeden.com/mangasimg/"
            cover_image=cover_image_path_prefix+series["im"]
            cover_image=URI.parse(cover_image)
          end
          params={eden_id: series["i"],title:series["t"],cover_image:cover_image,latest_update:latest_update}
          Series.create(params)
        end
      end
    end

    def fetch_eden_categories
      puts "Fetch eden categories"
      data = HTTParty.get("https://www.mangaeden.com/api/list/0/",{format: :json})
      series_list = data["manga"]
      series_list.each do |series|
        if series["c"].present? and Series.exists?(eden_id: series["i"])
          current_series=Series.find_by(eden_id:series["i"])
          series["c"].each do |tag|
            tag_obj = Tag.find_or_create_by(name: tag.downcase)
            current_series.tags << tag_obj
          end
        end
      end
    end

end
