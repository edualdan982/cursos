package edual.interceptors.app.interceptors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component("loadingTimeInterceptor")
public class LoadingTimeInterceptor implements HandlerInterceptor {
  private static final Logger log = LoggerFactory.getLogger(LoadingTimeInterceptor.class);
  @Autowired
  private ObjectMapper objectMapper;

  @Override
  public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
      @Nullable ModelAndView modelAndView) throws Exception {
    log.info("LoadingTimeInterceptor: postHandle() entrando...");
    HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
  }

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    log.info("LoadingTimeInterceptor: preHandle() entrando...");
    HandlerMethod method = (HandlerMethod) handler;
    log.info("LoadingTimeInterceptor: preHandle() method: {}, {}", method.getMethod().getName());

    log.info("Response: {}", objectMapper.writeValueAsString(response));
    log.info("Request: {}", objectMapper.writeValueAsString(request));
    return HandlerInterceptor.super.preHandle(request, response, handler);
  }

}
