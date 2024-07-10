package edual.interceptors.app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import edual.interceptors.app.interceptors.LoadingTimeInterceptor;

@Configuration
public class MvcConfig implements WebMvcConfigurer {
  @Autowired
  @Qualifier("loadingTimeInterceptor")
  private LoadingTimeInterceptor loadingTimeInterceptor;

  @Override
  public void addInterceptors(InterceptorRegistry registry) {
    registry.addInterceptor(loadingTimeInterceptor);
  }

}
