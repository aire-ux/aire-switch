package io.sunshower.aire.ux.controls.routes;

import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.spring.annotation.RouteScope;
import io.sunshower.aire.ux.controls.Switch;

@RouteScope
@Route("aire-switch")
public class SwitchRoute extends VerticalLayout {

  public SwitchRoute() {
    add(new Switch());
  }
}
