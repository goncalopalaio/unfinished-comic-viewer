namespace :eden do
  desc "Get chapters from eden"
  task get_chapters: :environment do
    series = Series.all
    series.each_with_index do |curr_series,index|
      series_eden_id = curr_series.eden_id
      uri = "https://www.mangaeden.com/api/manga/%s" % [series_eden_id]
      puts "Fetching chapter data for series: ", curr_series.title, "from ",uri

      series_data = HTTParty.get(uri)
      series_data["chapters"].each do |chapter|
        puts "Chapter Number",chapter[0]
        chapter = Chapter.create(eden_id: chapter[3],number: chapter[0],series: curr_series)
        fetch_pages(chapter)
      end

      ordered_chapters = curr_series.chapters.order("number asc")
      fill_prev_next_chapter(ordered_chapters)

    end
  end

  def fetch_pages(chapter)
    uri = "https://www.mangaeden.com/api/chapter/%s" % [chapter.eden_id]
    chapter_data = HTTParty.get(uri)
    chapter_data["images"].each do |image|
      url_image="https://cdn.mangaeden.com/mangasimg/%s" % [image[1]]
      ChapterPage.create(url:url_image,number: image[0],chapter: chapter)
    end
  end
  def fill_prev_next_chapter(ordered_chapters)
    count = ordered_chapters.count
    ordered_chapters.each_with_index do |chap, index|
      puts "index %s" % index
      if index == 0
        #first
        next_chap_id = ordered_chapters[index+1].id
        chap.update(next: next_chap_id, prev: "")

      elsif index == count-1
        #last
        prev_chap_id = ordered_chapters[index-1].id
        chap.update(next: "", prev: prev_chap_id)
      else
        #inbetween
        next_chap_id = ordered_chapters[index+1].id
        prev_chap_id = ordered_chapters[index-1].id
        chap.update(next: next_chap_id, prev: prev_chap_id)
      end
    end
  end

  desc "Get all Series information from eden"
  task get_series: :environment do
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
  desc "Get test Series information from eden"
  task get_test_series: :environment do

    data = HTTParty.get("https://www.mangaeden.com/api/list/0/",{format: :json})
    series_list = data["manga"]
    series_list[0..2].each_with_index do |series,index|
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

  desc "TODO"
  task get_categories: :environment do
  end

end
