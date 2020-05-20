module ApplicationHelper
  def image_urls
    [
      "https://i.pinimg.com/originals/6d/10/ff/6d10ff9e8c5b1dcffeba60c2d99f3fd0.gif"
    ]
  end

  def bootstrap_class_for(flash_type)
    {
      success: "alert-success",
      error: "alert-danger",
      alert: "alert-warning",
      notice: "alert-info"
    }.stringify_keys[flash_type.to_s] || flash_type.to_s
  end
end
