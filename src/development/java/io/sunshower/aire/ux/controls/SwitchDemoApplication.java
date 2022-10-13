package io.sunshower.aire.ux.controls;

import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.server.PWA;
import com.vaadin.flow.spring.annotation.EnableVaadin;
import io.sunshower.aire.ux.controls.routes.SwitchRoute;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@PWA(name = "Switch Demo", shortName = "Demo")
@ComponentScan(basePackageClasses = SwitchRoute.class)
@EnableVaadin({"io.sunshower.aire.ux.controls.routes"})
public class SwitchDemoApplication extends VerticalLayout implements AppShellConfigurator {

  public static void main(String[] args) {
    SpringApplication.run(SwitchDemoApplication.class, args);
  }
}
